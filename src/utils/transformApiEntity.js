const transformApiEntity = entity => ({
  guid: entity.guid,
  title: entity.title,
  type: entity.type,
  kind: entity.kind,
  releaseYear: entity.release_year,
  numberOfDiscs: entity.number_of_discs
});

export default transformApiEntity;
