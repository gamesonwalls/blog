import React from 'react';



function Componentthree() {
  return (
    <div className="">
        <h3>Component One</h3>
        <hr/>
        <img 
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        alt="new"
        className="img-responsive center-block"
        />
            <div className="text-center">
            <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td><a href="http://facebook.com">@facebook</a></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td><a href="https://twitter.com/">@twitter</a></td>
              </tr>
            </tbody>
          </table>
          </div>
      
    </div>
  );
}

export default Componentthree;
