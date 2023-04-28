import { Card, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";

import { ExportWeapon } from "../../slices/warframe/types/export/ExportWeapons_en";
import { EXPORT_MANIFEST } from "../../slices/warframe/types/WarframeState";
import { selectWarframeExports } from "../../slices/warframe/WarframeSlice";
import { useAppSelector } from "../../store";

interface WeaponCardProps {
  weapon: ExportWeapon;
}

const WeaponCard = ({ weapon }: WeaponCardProps) => {
  const warframeExports = useAppSelector(selectWarframeExports);

  const exportManifest = warframeExports[EXPORT_MANIFEST];

  return (
    <div>
      {weapon === undefined ? (
        <CircularProgress />
      ) : (
        <Card variant="outlined">
          <Typography>{weapon.name}</Typography>
        </Card>
      )}
    </div>
  );
};

export default WeaponCard;
