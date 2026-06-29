(function () {
  const KEY = "nameforge-favorites";

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveFavorite(item) {
    const favorites = getFavorites();
    if (!favorites.some((favorite) => favorite.id === item.id)) {
      favorites.unshift(item);
      try {
        localStorage.setItem(KEY, JSON.stringify(favorites));
      } catch {
        return false;
      }
    }
    return true;
  }

  function removeFavorite(id) {
    const favorites = getFavorites().filter((favorite) => favorite.id !== id);
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    } catch {
      return false;
    }
    return true;
  }

  function isFavorite(id) {
    return getFavorites().some((favorite) => favorite.id === id);
  }

  window.NameForgeStorage = { getFavorites, saveFavorite, removeFavorite, isFavorite };
})();
