import axios from 'axios';

export const fetchImagesWithQuery = async (searchQuery, pageNr) => {
  const response = await axios.get(
    `/?q=${searchQuery}&page=${pageNr}&key=31993556-98ab722596578832b23ea9bf6&image_type=photo&orientation=horizontal&per_page=12`
  );

  const images = response.data.hits.map(image => ({
    id: image.id,
    webformatURL: image.webformatURL,
    largeImageURL: image.largeImageURL,
  }));
  const totalHits = response.data.totalHits;
  return { images, totalHits };
};
