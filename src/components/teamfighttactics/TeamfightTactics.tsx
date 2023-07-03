import { CircularProgress, Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

import { LOADING_STATE } from "../../constants/Constants";
import {
  fetchMetasrcData,
  selectTftMetasrcData,
  selectTftMetasrcDataStatus,
} from "../../slices/teamfighttactics/TeamfightTacticsSlice";
import { Category, TftMetasrc } from "../../slices/teamfighttactics/types/TftMetasrc";
import { useAppDispatch, useAppSelector } from "../../store";

const teamfightTactics = () => {
  const dispatch = useAppDispatch();

  const tftMetasrcDataStatus = useAppSelector(selectTftMetasrcDataStatus);
  const tftMetasrcData = useAppSelector(selectTftMetasrcData);

  const [parsedTftMetasrcData, setParsedTftMetasrcData] = useState<TftMetasrc[]>([]);
  const [filteredTftMetasrcData, setFilteredTftMetasrcData] = useState<TftMetasrc[]>([]);
  const [augmentTiers, setAugmentTiers] = useState<string[]>([]);

  /**
   * Sorts the augments by tier. Tier order: S+, S, A, B, C, D.
   */
  const S_TIER = "S";
  const sortByTier = (a: TftMetasrc, b: TftMetasrc) => {
    if (a.tier === b.tier) return a.name.localeCompare(b.name);

    if (a.tier.includes(S_TIER) && b.tier.includes(S_TIER)) {
      return -a.tier.localeCompare(b.tier);
    }

    if (a.tier.includes(S_TIER)) return -1;
    if (b.tier.includes(S_TIER)) return 1;

    return a.tier.localeCompare(b.tier);
  };

  useEffect(() => {
    if (tftMetasrcDataStatus === LOADING_STATE.COMPLETE) return;

    dispatch(fetchMetasrcData());
  }, []);

  useEffect(() => {
    if (tftMetasrcDataStatus != LOADING_STATE.COMPLETE) return;

    const parsedData = tftMetasrcData
      .filter((data) => data.category === Category.Augment)
      // Parse the "tier" field.
      .map((data) => ({
        ...data,
        // Regex to get the tier.
        tier: data.tier.match(/class[^>]*>(.*?)<\/span>/)?.[1] ?? "Tier not found.",
        // Regex to get the image.
        image: data.image.match(/data-src="(.*?)"/)?.[1] ?? "Image not found.",
      }))
      // Sort by tier.
      .sort(sortByTier);

    // Get list of tiers, remove duplicates, and maintain order.
    const tiers = parsedData.map((data) => data.tier).filter((tier, index, self) => self.indexOf(tier) === index);

    setAugmentTiers(tiers);
    setParsedTftMetasrcData(parsedData);
  }, [tftMetasrcDataStatus]);

  const [augmentFilter, setAugmentFilter] = useState("");
  const getFuse = useMemo(() => {
    return new Fuse(parsedTftMetasrcData, {
      includeScore: true,
      useExtendedSearch: true,
      keys: ["name"],
      threshold: 0.3,
    });
  }, [parsedTftMetasrcData]);
  useEffect(() => {
    const fuse = getFuse;

    const filter = augmentFilter.replace(",", "|");
    const results = fuse.search(filter).map((result) => result.item);
    const sortedResults = results.sort(sortByTier);
    setFilteredTftMetasrcData(sortedResults);
  }, [augmentFilter]);

  return (
    <Paper>
      <input
        type="text"
        placeholder="Search..."
        value={augmentFilter}
        onChange={(e) => setAugmentFilter(e.target.value)}
      />
      {(parsedTftMetasrcData.length === 0 && filteredTftMetasrcData.length === 0) || augmentTiers.length === 0 ? (
        <CircularProgress />
      ) : (
        <div>
          {augmentTiers.map((tier, i) => (
            <div key={i}>
              <Typography key={i}>{tier}</Typography>

              {(filteredTftMetasrcData.length === 0 ? parsedTftMetasrcData : filteredTftMetasrcData)
                .filter((data) => data.tier === tier)
                .map((data, i) => (
                  <div key={i}>
                    {data.name} | Tier: {data.tier}
                    <img src={data.image} alt={data.name} width="100" height="100" />
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default teamfightTactics;
