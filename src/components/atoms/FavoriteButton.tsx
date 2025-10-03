import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import type { Bill } from '../../types/bill';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { transformBillToFavorite } from '../../utils/billUtils';

interface FavoriteButtonProps {
  bill: Bill;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton = ({ bill, size = 'medium' }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(bill.id);

  const handleToggleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (favorite) {
      await removeFavorite(bill.id);
    } else {
      await addFavorite(transformBillToFavorite(bill));
    }
  };

  return (
    <IconButton
      onClick={handleToggleFavorite}
      size={size}
      color={favorite ? 'error' : 'default'}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};
