import React from 'react';
import Header from './Header.jsx';
import FixedHeader from './FixedHeader.jsx';
import Sidebar from './Sidebar.jsx';
import FixedSidebar from './FixedSidebar.jsx';
import requests from '../lib/requests.js';
import TopRow from './TopRow.jsx';
import styles from '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: {},
      bannerHeight: null,
      distanceToBelowTrailer: null,
      headerFixed: false,
      sidebarFixed: false,
      couponUsed: false,
      isLoading: true,
    };
    this.addScrollListener = this.addScrollListener.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.changePrice = this.changePrice.bind(this);
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
    // Need to setTimeout to allow time to properly mount and calculate proper offsetHeight
    setTimeout(() => {
      const bannerHeight = document.querySelector('.App__banner___3EFF9').offsetHeight;
      const topRowHeight = document.querySelector('.TopRow__topRow___SvI7h').offsetHeight;
      const trailerHeight = document.querySelector('.Trailer__trailerBox___28ieD').offsetHeight + 3;
      const distanceToBelowTrailer = topRowHeight + trailerHeight;
      this.setState({
        bannerHeight,
        distanceToBelowTrailer,
      });
    });
  }

  changePrice() {
    const courseData = { ...this.state.courseData };
    const newPrice = `$${(Number((courseData.discount_price).split('$')[1]) - 5).toFixed(2)}`;
    courseData.discount_price = newPrice;
    if (!this.state.couponUsed) {
      this.setState({
        courseData,
        couponUsed: true,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    // requests.getCourseData(this.state.courseId)
    // window.location.pathname === '/courses/66/'
    requests.getCourseData(window.location.pathname)
      .then(data => (
        this.setState({
          courseData: data,
          isLoading: !this.state.isLoading,
        }, () => this.addScrollListener())
      ));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div>
        <div className={ styles.banner }>
          <div className={ styles.container }>
            <TopRow />
            <div className={ styles.contentBox }>
              <Header course={ this.state.courseData }/>
              {this.state.sidebarFixed
                ? <FixedSidebar
                  course={ this.state.courseData }
                  changePrice={ this.changePrice }
                  />
                : <Sidebar
                  course={ this.state.courseData }
                  changePrice={ this.changePrice }
                  />
              }
            </div>
          </div>
        </div>
        {this.state.headerFixed
          ? <FixedHeader course={ this.state.courseData } />
          : null
        }
      </div>
    );
  }
}

export default App;
