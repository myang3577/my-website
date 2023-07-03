import { Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
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
import { AugmentCardGrid } from "./augments/AugmentCardGrid";

const GRID_SPACING_SIZE = 4;
const GRID_SPACING_VALUE = 2;

export const TeamfightTactics = () => {
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
    console.log(parsedData[0]);
  }, [tftMetasrcDataStatus]);

  const [augmentFilter, setAugmentFilter] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(parsedTftMetasrcData, {
        includeScore: true,
        useExtendedSearch: true,
        keys: ["name"],
        threshold: 0.3,
      }),
    [parsedTftMetasrcData]
  );
  useEffect(() => {
    const filter = augmentFilter.replace(",", "|");
    const results = fuse.search(filter).map((result) => result.item);
    const sortedResults = results.sort(sortByTier);
    setFilteredTftMetasrcData(sortedResults);
  }, [augmentFilter]);

  const getAugmentsForTier = (tier: string) =>
    (filteredTftMetasrcData.length === 0 ? parsedTftMetasrcData : filteredTftMetasrcData).filter(
      (data) => data.tier === tier
    );

  return (
    <Paper>
      <Grid container spacing={GRID_SPACING_VALUE} columns={2} sx={{ width: "100%", margin: "auto" }}>
        <Grid xs={2}>
          <Typography variant="h4">TFT Augments</Typography>
        </Grid>

        <Grid xs={2}>
          <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
            <input
              type="text"
              placeholder="Search..."
              value={augmentFilter}
              onChange={(e) => setAugmentFilter(e.target.value)}
            />
          </Paper>
        </Grid>

        {augmentTiers.map((tier, i) => {
          return (
            getAugmentsForTier(tier).length > 0 && (
              <Grid xs={2} key={i}>
                <Paper sx={{ p: `${GRID_SPACING_SIZE * GRID_SPACING_VALUE}px` }}>
                  <Typography variant="h6">{tier} Tier</Typography>
                  <AugmentCardGrid augments={getAugmentsForTier(tier)} />
                </Paper>
              </Grid>
            )
          );
        })}
      </Grid>
    </Paper>
  );
};