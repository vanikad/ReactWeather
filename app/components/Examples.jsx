var React = require('react');
var {Link} = require('react-router');

// var Examples = React.createClass({
//   render: function(){
//     return(
//       <h3>Examples component</h3>
//     )
//   }
// });

var Examples = (props) => {
  return(
    <div>
    <h3 className="text-center">Examples</h3>
    <p>Here are few example locations to try out:</p>
      <ol>
        <li>
          <Link to='/?location=Toronto'>Toronto, CA</Link>
        </li>
        <li>
          <Link to='/?location=Rio'>Rio, Brazil</Link>
        </li>
      </ol>
  </div>
  )
}

module.exports = Examples;
