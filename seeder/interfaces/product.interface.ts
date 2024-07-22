import NutriScoreDto from "./nutriscore.interface";

interface Product {
  name: string;
  description: string;
  categoryProductId: number;
  harvestStartMounth: number;
  harvestEndMounth: number;
  thumbnail: string;
  urlBannerImage: string;
  conservationTime: number;
  nutriscore: NutriScoreDto[];
}

export default Product;
