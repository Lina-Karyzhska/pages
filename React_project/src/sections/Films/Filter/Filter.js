import React, { Component } from 'react';
import RangeSlider from './RangeSlider';
import Checkbox from './Checkbox';
import Genres from './DropdownGenres';
import Sort from './DropdownSort';
import Drawer from '@material-ui/core/Drawer';

function Makedrawer(props) {
    return (
        <Drawer open={props.isOpen} onClose={() => props.toggleDrawer(false)}>
            {props.children}
        </Drawer>
    )
}

class Filter extends Component {
    constructor(props){
        super(props);

        this.filters = {
          isMovie: false,
          isTV: false,
          genre: "",
          years: [1940, 2021],
          sort: "",
          title: "",
        }

        this.state = {
            drawer: window.innerWidth > 768 ? false : true,
            isOpen: window.innerWidth > 768 ? true : false,
        }
    }

    updateDrawer = () => {
      let isOpen = window.innerWidth > 768 ? false : true;
      this.setState({
        drawer: isOpen,
        isOpen: !isOpen
      });
    }

    componentDidMount() {
      window.addEventListener("resize", this.updateDrawer);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDrawer);
    }

    setFilters = (filter, value) => {
        this.filters[filter] = value;
        this.props.getFilters(this.filters);
        document.querySelector(".section_second").scrollIntoView({behavior: "smooth"});
    }

    componentDidUpdate() {
        if (this.filters.title != this.props.title) {
            this.filters.title = this.props.title;
            this.props.getFilters(this.filters);
        }
    }

    toggleDrawer = (isOpen, event) => {
        if (event) event.preventDefault();
        this.setState({isOpen: isOpen});
    };

    render() {
        return (
            <form className="filter">
                {this.state.drawer ? <button className="filter__btn button" onClick={(event) => this.toggleDrawer(true, event)}>Set filters</button> : null}

                { !this.state.drawer ? (
                <>
                    <div className="filter__params">
                        <div className="filter__types">
                            <Checkbox setFilter={this.setFilters} name="TV"/>
                            <Checkbox setFilter={this.setFilters} name="Movie"/>
                        </div>

                            <div className="filter__dropdown filter__dropdown_genres">
                                <Genres setFilter={this.setFilters}/>
                            </div>

                            <div className="filter__slider">
                                <span>Age</span>
                                <RangeSlider setFilter={this.setFilters}/>
                            </div>
                        </div> 

                    <div className="filter__dropdown_sort">
                        <span>Sort by:</span>
                        <Sort setFilter={this.setFilters}/>
                    </div>
                </>) : 
                    <Makedrawer isOpen={this.state.isOpen} toggleDrawer={this.toggleDrawer}>                        
                        <div className="filter__params_drawer">
                            <form className="search_wrapper" onSubmit={this.handleSubmit}>
                                <input className="search" type="text" placeholder="Search by name" ref={this.filmTitle}/>
                            </form> 

                            <div className="filter__control filter__types filter__types_drawer">
                                <Checkbox setFilter={this.setFilters} name="TV"/>
                                <Checkbox setFilter={this.setFilters} name="Movie"/>
                            </div>

                            <div className="filter__control filter__dropdown filter__dropdown_genres">
                                <Genres setFilter={this.setFilters}/>
                            </div>

                            <div className="filter__control filter__slider">
                                <span>Age</span>
                                <RangeSlider setFilter={this.setFilters}/>
                            </div>

                            <div className="filter__control filter__dropdown_sort">
                                <span>Sort by:</span>
                                <Sort setFilter={this.setFilters}/>
                            </div>
                        </div> 
                    </Makedrawer>
                }
                               
            </form>
        )
    }
}

export default Filter;
