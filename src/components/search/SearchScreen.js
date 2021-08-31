import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search); // Por defecto esta en blanco

    const [formValues, handleInputChange] = useForm({
        searchText: q // Por defecto tendrá el valor de la url
    });
    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])
    // const heroesFiltered = getHeroesByName( searchText );

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`); // Para concatenar al url
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch} className="d-grid gap-2">
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-block btn-outline-info m-1"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">

                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '')
                        &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                        &&
                        <div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
