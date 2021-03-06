var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function(){
    return {
      isLoading: false,
      errorMessage: undefined,
      locaton: undefined,
      temp: undefined
    }
  },
  handleSearch: function(location){
    var that = this;

    this.setState({isLoading: true});

    openWeatherMap.getTemp(location).then(function(temp){
        that.setState({
          location: location,
          temp: temp,
          isLoading: false
        });
    }, function(e){
        that.setState({
          isLoading: false,
          errorMessage: e.message,
          location: '',
          temp: ''
        });
    });
  },
  componentDidMount: function(){
    var location = this.props.location.query.location;
    if(location && location.length > 0){
      this.handleSearch(location);
      window.location.hash='#/';
    }
  },
  componentWillReceiveProps: function(newProps){
    var location = newProps.props.location.query.location;
    if(location && location.length > 0){
      this.handleSearch(location);
      window.location.hash='#/';
    }
  },
  render: function(){
    var {isLoading, location, temp, errorMessage} = this.state;
    console.log(location + " " + temp);
    function renderMessage(){
      if(isLoading){
        return <h3 classNane="text-center">Fetching weather...</h3>
      } else if (temp && location){
        console.log("Temp and location " +location + " " + temp);
        return <WeatherMessage location={location} temp={temp}/>
      }
    }

    function renderError(){
      if (typeof errorMessage === 'string'){
        return (
          <ErrorModal message={errorMessage} />
        )
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
    </div>
    )
  }
});

module.exports = Weather;
