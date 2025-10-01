import { IconButton, CircularProgress } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import type { Bill } from '../../types/bill';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { transformBillToFavorite } from '../../utils/billUtils';

interface FavoriteButtonProps {
  bill: Bill;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton = ({ bill, size = 'medium' }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite, isPending } = useFavoritesStore();
  const billNo = bill.bill.billNo;
  const favorite = isFavorite(billNo);
  const pending = isPending(billNo);

  const handleToggleFavorite = async () => {
    try {
      if (favorite) {
        await removeFavorite(billNo);
      } else {
        await addFavorite(transformBillToFavorite(bill));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <IconButton
      onClick={handleToggleFavorite}
      disabled={pending}
      size={size}
      color={favorite ? 'error' : 'default'}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {pending ? (
        <CircularProgress size={size === 'small' ? 16 : 24} />
      ) : favorite ? (
        <Favorite />
      ) : (
        <FavoriteBorder />
      )}
    </IconButton>
  );
};
