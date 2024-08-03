type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const FavoriteButton = ({
  isFavorite,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={onToggleFavorite}
        className="flex items-center p-1 focus:outline-none"
      >
        <p className="pr-2">Add To Favorite</p>
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-yellow-500 transition-transform duration-200 transform hover:scale-110"
          >
            <path d="M12 17.75l-5.518 3.64c-.547.36-1.305-.067-1.128-.744l1.622-6.468-5.172-4.198c-.534-.433-.235-1.285.472-1.285h6.42L12 2.748l2.304 5.947h6.42c.707 0 1.006.852.472 1.285l-5.172 4.198 1.622 6.468c.177.677-.581 1.104-1.128.744L12 17.75z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 transition-transform duration-200 transform hover:scale-110 hover:text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 17.75l-5.518 3.64c-.547.36-1.305-.067-1.128-.744l1.622-6.468-5.172-4.198c-.534-.433-.235-1.285.472-1.285h6.42L12 2.748l2.304 5.947h6.42c.707 0 1.006.852.472 1.285l-5.172 4.198 1.622 6.468c.177.677-.581 1.104-1.128.744L12 17.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FavoriteButton;
