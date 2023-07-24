import { Link, useParams } from 'react-router-dom';
import { Beer } from '../../Types/Beer';
import { useCallback, useEffect, useState } from 'react';

export const ProductItem = () => {
  const [beer, setBeer] = useState<Beer | null>(null);

  const { id } = useParams();
  const apiBeer = `https://api.punkapi.com/v2/beers/${id}`;

  const getOneBeer = useCallback(async (): Promise<Beer> => {
    const response = await fetch(apiBeer);
    if (!response.ok) {
      throw new Error('Failed to fetch beer data');
    }
    const data = await response.json();
    return data[0];
  }, [apiBeer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneBeer();
        setBeer(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [getOneBeer]);

  return (
    <div className='beer-page'>
      <Link
          to="#"
          onClick={() => window.history.back()}
        >
            <div className="back"> &#60; Back</div>
        </Link>
      {beer && (
        <div className='beer-information'>
            <h1>Beer Name: {beer.name}</h1>
            <h3>{beer.tagline}</h3>
            <div className='beer-wrapper'>
                <img
                    src={`${beer.image_url}`} 
                    alt="beer"
                    className='beer-image'
                />
                <div className='beer-description'>
                    <div><strong>Description: </strong>{beer.description}</div>
                    <div><strong>Food pairing: </strong>{beer.food_pairing}</div>
                    <div><strong>Created: </strong>{beer.first_brewed}</div>
                    <div><strong>Brewer tisp: </strong>{beer.brewers_tips}</div>
                    <div><strong>Created by: </strong>{beer.contributed_by}</div>
                    <div><strong>ABV: </strong>{beer.abv}</div>
                    <div><strong>Attenuation level: </strong>{beer.attenuation_level}</div>
                    <div><strong>Boil volume value: </strong>{beer.boil_volume.value}</div>
                    <div><strong>EBC: </strong>{beer.ebc}</div>
                    <div><strong>IBU: </strong>{beer.ibu}</div>
                    <div><strong>Ingredients yeast: </strong>{beer.ingredients.yeast}</div>
                    <div><strong>Method fermentation temp unit: </strong>{beer.method.fermentation.temp.unit}</div>
                    <div><strong>Method fermentation temp value: </strong>{beer.method.fermentation.temp.value}</div>
                    <div><strong>SRM: </strong>{beer.srm}</div>
                    <div><strong>Target FG: </strong>{beer.target_fg}</div>
                    <div><strong>Target OG: </strong>{beer.target_og}</div>
                    <div><strong>Volume unit: </strong>{beer.volume.unit}</div>
                    <div><strong>Volume value: </strong>{beer.volume.value}</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
