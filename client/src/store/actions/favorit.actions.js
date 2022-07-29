export const favorit = (data) => ({
  type: 'FAVORIT',
  params: data
});

export const listFavorit = () => ({
  type: 'FAVORIT_LIST'
});

export const deleteFavorit = (data) => ({
  type: 'DELETE_FAVORIT',
  params: data
});
