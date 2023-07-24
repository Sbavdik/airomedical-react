import { Beer } from "../../Types/Beer";
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useBeerListStore } from "../../Store/store";

type Props = {
    beers: Beer[];
    onBeerSelect: (event: React.MouseEvent<HTMLDivElement> ,beer: Beer) => void;
}

export const ProductList: React.FC<Props> = ({ beers, onBeerSelect }) => {
    const totalPages = useBeerListStore((state) => state.totalPages);
    const setCurrentPage = useBeerListStore((state) => state.setCurrentPage);
    const currentPage = useBeerListStore((state) => state.currentPage);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };

    const handleBeerClick = (event: React.MouseEvent<HTMLDivElement>, beer: Beer) => {
        event.preventDefault();
        if (event.button === 2) {
          onBeerSelect(event, beer);
        }
    };

    return (
    <div className="container">
      {beers.map((beer) => (
        <Link to={`${beer.id}`} key={beer.id}>
            <div
                onContextMenu={(event) => handleBeerClick(event, beer)}
                className={cn('beer-item', {
                    selected: beer.selected
                })}
            >
                <h2>{beer.name}</h2>
                <img
                    src={`${beer.image_url}`}
                    alt="beer-img"
                    className="beer-image"
                />
                <p className="beer-description__main">{beer.description}</p>
            </div>
        </Link>
        ))}

<div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index}
            to={`/?page=${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            <div className="number">{index + 1}</div>
          </Link>
        ))}
      </div>
    </div>
    )
}