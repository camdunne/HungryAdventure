import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
//++++++ Imported Actions
import { fetchDestinations } from '../actions/destinationsAction';
import { getBudget } from '../actions/budgetAction';
import { PageHeader } from 'react-bootstrap';
import { saveSearchQuery } from '../actions/saveSearchQueryAction';
import { reset } from '../actions/resetState'
import { getGoogleData } from '../actions/userLocationAction'


// import { userLocation } from './userLocationAction'
//Reducer for react inputs
import { combineReducers } from 'redux';
//Imported Component
import Search from './searchForm';
import Auth from './FacebookAuth';
import UserLocationTrigger from './UserLocationTrigger'

// Charts
import DonutChart from 'react-donut-chart';



class Layout extends React.Component {
  constructor (props){
    super(props);
  }


  componentWillMount() {
    this.props.reset();
  }

  getLocation = () => {
     let options = {
     enableHighAccuracy: true,
     timeout: 5000,
     maximumAge: 0
   };
   const success = (pos) => {
     let crd = pos.coords;

     this.props.getGoogleData({
       latitude: crd.latitude,
       longitude: crd.longitude
     })
     console.log('Your current position is:');
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`More or less ${crd.accuracy} meters.`);
   };

   const error = (err) => {
     console.warn(`ERROR(${err.code}): ${err.message}`);
   };

   navigator.geolocation.getCurrentPosition(success, error, options)
 }

  submit = (values) => {
  this.getLocation()
  let saveQueryObj = {
    email: this.props.email || 'none',
    budget: values.Budget,
    startDate: values.departDate,
    endDate: values.arrivalDate,
  }
    values.cityId = this.props.airportCode.airportCode;
    this.props.getBudget(values);
    this.props.history.push(`/flights?Budget=${values.Budget}&departDate=${values.departDate}&arrivalDate=${values.arrivalDate}`);
    this.props.fetchDestinations(values)
      .then(() =>{
        this.props.saveSearchQuery(saveQueryObj);
      })
  }

  render () {
     return (
      <div>
      <header>
      <Auth />
        <section id="search">
          <div className="header-content">
            <div className="header-content-inner">
              <br></br>
              <h1 id="homeHeading">HUNGRY ADVENTURE</h1>
              <hr></hr>
              <center>
                <Search onSubmit={this.submit} />
              </center>
            </div>
          </div>
        </section>
      </header>

    <section className="bg-primary" id="about">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                  <h2 className="section-heading">Ready for an Adventure?</h2>
                  <hr className="light"></hr>
                  <p className="text-faded">Do you have a budget and data you're available but don't know where to go or what your options are? We have you covered! Out site provides a one stop shop for all travel
                  needs.</p>
                <a href="#" className="page-scroll btn btn-default btn-xl sr-button" style={{ borderRadius: '0', backgroundColor: 'white' }}>Let's Get Started!</a>
                </div>
            </div>
        </div>
    </section>

    <section id="services">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 className="section-heading">What We Do</h2>
                    <hr className="primary"></hr>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box">
                        <i className="fa fa-4x fa-diamond text-primary sr-icons"></i>
                        <h3>Aggrigate</h3>
                        <p className="text-muted">We aggrigate Skyscanner, Airbnb, Yelp, Google, Weather and more..</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box">
                        <i className="fa fa-4x fa-paper-plane text-primary sr-icons"></i>
                        <h3>Destinations</h3>
                        <p className="text-muted">We generate options for you!</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box">
                        <i className="fa fa-4x fa-newspaper-o text-primary sr-icons"></i>
                        <h3>Stay and Play </h3>
                        <p className="text-muted">We present affordable and fun options!</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="service-box">
                        <i className="fa fa-4x fa-heart text-primary sr-icons"></i>
                        <h3>Story</h3>
                        <p className="text-muted">You Construct a custom itinary and story</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="no-padding" id="locations">
        <div className="container-fluid">
            <div className="row no-gutter popup-gallery">
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/3.jpg" className="portfolio-box">
                        <img src="../../assets/3.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/4.jpg" className="portfolio-box">
                        <img src="../../assets/4.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/5.jpg" className="portfolio-box">
                        <img src="../../assets/5.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/6.jpg" className="portfolio-box">
                        <img src="../../assets/6.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/1.jpg" className="portfolio-box">
                        <img src="../../assets/1.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <a href="../../assets/5.jpg" className="portfolio-box">
                        <img src="../../assets/5.jpg" className="img-responsive headImg" alt=""></img>
                        <div className="portfolio-box-caption">
                            <div className="portfolio-box-caption-content">
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

     <aside className="bg-dark">
        <div className="container text-center">
            <div className="call-to-action">
                <h2>Development Team!</h2>
            </div>
        </div>
    </aside>

    <section id="contact">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <h2 className="section-heading">Development Team!</h2>
                    <hr className="primary"></hr>
                    <p>Get Ready as we introduce!</p>
                </div>
                <div className="col-lg-4 col-lg-offset-2 text-center">
                    <i className="fa fa-phone fa-3x sr-contact"></i>
                    <p>999-999-9999</p>
                </div>
                <div className="col-lg-4 text-center">
                    <i className="fa fa-envelope-o fa-3x sr-contact"></i>
                    <p><a href="mailto:your-email@hotmail.com">team@hungryadventure.com</a></p>
                </div>
            </div>
        </div>
    </section>

      </div>
    );
  }
}



//Connects to store
const mapStateToProps = ({destinations, budget, profile, form, airportCode}) => ({
 destinations: destinations.destinations,
 budget,
 ...profile,
 form,
 airportCode,
})

export default connect(mapStateToProps, { fetchDestinations, getBudget, saveSearchQuery, reset, getGoogleData })(Layout);
