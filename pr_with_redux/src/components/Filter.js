import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.filters = {
            firstname: "",
            lastname: "",
            age: "",
            male: true,
            female: false,
        }
    }

    handleChange = (event) => {
        const {getList} = this.props;
        const {id, value, checked} = event.target;
        if (event) this.filters[id] = value === "on" ? checked : value;
        getList(this.filters);
    }

    render() {
        return (
            <form className="filter">
                <fieldset className="filter__wrapper">
                    <legend>Фильтры</legend>

                    <div className="filter__inputfields">
                        <label htmlFor="firstname">Имя</label>
                        <input type="text" id="firstname" name="firstname" onChange={this.handleChange}/>
                    </div>

                    <div className="filter__inputfields">
                        <label htmlFor="lastname">Фамилия</label>
                        <input type="text" id="lastname" onChange={this.handleChange}/>
                    </div>

                    <div className="filter__inputfields">
                        <label htmlFor="age">Возраст</label>
                        <input type="text" id="age" onChange={this.handleChange}/>
                    </div>

                    <div>
                        <span>Пол</span>

                        <div className="filter__gender">
                            <input type="checkbox" id="male" name="sex" defaultChecked onChange={this.handleChange}/>
                            <label htmlFor="m">м</label>
                        </div>

                        <div className="filter__gender">
                            <input type="checkbox" id="female" name="sex" onChange={this.handleChange}/>
                            <label htmlFor="f">ж</label>
                        </div>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default Filter;