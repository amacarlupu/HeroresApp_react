import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroById';

export const HeroScreen = ({ history }) => {

    const { heroId } = useParams();

    // useMemo para volver a renderizar solo si cambia el 'heroId'
    const hero = useMemo(() => getHeroesById(heroId), [heroId])
    // hero = getHeroesById(heroId);

    // Si no existe el Id
    if (!hero) {
        return <Redirect to="/" />;
    }

    // Regresa a la pagina anterior
    const handleReturn = () => {
        // Para el modo incognito
        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    // Desestructurar valores de 'hero'
    const {
        alter_ego,
        characters,
        first_appearance,
        publisher,
        superhero
    } = hero;


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={`../assets/heroes/${heroId}.jpg`}
                    alt={superhero}
                    className="img-thumbnail  animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8  animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b>{first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button
                    className="btn btn-danger"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
