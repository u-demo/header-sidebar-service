import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCourseData from '../actions/fetchCourse';

import Header from './Header.jsx';
import FixedHeader from './FixedHeader.jsx';
import Sidebar from './Sidebar.jsx';
import TopRow from './TopRow.jsx';
import ModalContainer from '../containers/ModalContainer.jsx';

import styles from '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerHeight: null,
      distanceToBelowTrailer: null,
      headerFixed: false,
      sidebarFixed: false,
    };
    this.addScrollListener = this.addScrollListener.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const { bannerHeight } = this.state;
    const { distanceToBelowTrailer } = this.state;
    if ((!this.state.headerFixed) && (window.scrollY >= bannerHeight)) {
      this.setState({ headerFixed: true });
    } else if (this.state.headerFixed && (window.scrollY <= bannerHeight)) {
      this.setState({ headerFixed: false });
    } else if ((!this.state.sidebarFixed) && (window.scrollY >= distanceToBelowTrailer)) {
      this.setState({ sidebarFixed: true });
    } else if (this.state.sidebarFixed && (window.scrollY <= distanceToBelowTrailer)) {
      this.setState({ sidebarFixed: false });
    }
  }

  addScrollListener() {
    window.addEventListener('scroll', this.handleScroll);

    const bannerHeight = document.querySelector('.App__banner___3EFF9').offsetHeight;
    const topRowHeight = document.querySelector('.TopRow__topRow___SvI7h').offsetHeight;
    const trailerHeight = document.querySelector('.Trailer__trailerBox___28ieD').offsetHeight + 3;
    const distanceToBelowTrailer = topRowHeight + trailerHeight;
    this.setState({
      bannerHeight,
      distanceToBelowTrailer,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    this.props.fetchCourseData();
    setTimeout(() => this.addScrollListener(), 500);
  }

  render() {
    const { isLoading, fetchError, courseData } = this.props;
    if (isLoading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } if (fetchError) {
      return (
        <div>
          <h3>{fetchError}</h3>
        </div>
      );
    }
    return (
      <div>
        <div className={ styles.banner }>
          <div className={ styles.container }>
            <div>
              <TopRow />
            </div>
            <div className={ styles.contentBox }>
              <Header course={ courseData } />
              <Sidebar sidebarFixed={ this.state.sidebarFixed } />
            </div>
          </div>
        </div>
        {this.state.headerFixed
          ? <FixedHeader course={ courseData } />
          : null
        }
        <ModalContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ courseDetails: { courseData, isLoading, fetchError } }) => ({
  courseData,
  isLoading,
  fetchError,
});

const mapDispatchToProps = {
  fetchCourseData,
};

App.propTypes = {
  fetchCourseData: PropTypes.func.isRequired,
  fetchError: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  courseData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
