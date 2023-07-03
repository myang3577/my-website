import { CircularProgress, Paper, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";

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
      .sort((a, b) => -a.tier.localeCompare(b.tier));

    setParsedTftMetasrcData(parsedData);
  }, [tftMetasrcDataStatus]);

  const [filterQuery, setFuzzySearchQuery] = useState("");
  useEffect(() => {
    const fuse = new Fuse(
      parsedTftMetasrcData.map((data) => data.name),
      {
        includeScore: true,
      }
    );
    const results = fuse.search(filterQuery).map((result) => result.item);

    setFilteredTftMetasrcData(parsedTftMetasrcData.filter((data) => results.includes(data.name)));
  }, [filterQuery]);

  return (
    <Paper>
      <input
        type="text"
        placeholder="Search..."
        value={filterQuery}
        onChange={(e) => setFuzzySearchQuery(e.target.value)}
      />
      {parsedTftMetasrcData.length === 0 && filteredTftMetasrcData.length === 0 ? (
        <CircularProgress />
      ) : (
        (filteredTftMetasrcData.length === 0 ? parsedTftMetasrcData : filteredTftMetasrcData).map((data, i) => (
          <div key={i}>
            {data.name} | Tier: {data.tier}
            <img src={data.image} alt={data.name} width="100" height="100" />
          </div>
        ))
      )}
    </Paper>
  );
};

export default teamfightTactics;
