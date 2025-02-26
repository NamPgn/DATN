import { Bar, Line } from "react-chartjs-2";

const Admin = () => {
  const barData = {
    labels: [
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
    ],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 45],
      },
    ],
  };
  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat">
          <h3>Today's Sales</h3>
          <p>
            $53,000 <span className="increase">+30%</span>
          </p>
        </div>
        <div className="stat">
          <h3>Today's Users</h3>
          <p>
            3,200 <span className="increase">+20%</span>
          </p>
        </div>
        <div className="stat">
          <h3>New Clients</h3>
          <p>
            +1,200 <span className="decrease">-20%</span>
          </p>
        </div>
        <div className="stat">
          <h3>New Orders</h3>
          <p>
            $13,200 <span className="increase">+10%</span>
          </p>
        </div>
      </div>
      <div className="additional-stats">
        <p>
          Active Users than last week <span className="increase">+30%</span>
        </p>
        <p>
          We have created multiple options for you to put together and customize
          into pixel perfect pages.
        </p>
        <ul>
          <li>3.6K Users</li>
          <li>2m Clicks</li>
          <li>$772 Sales</li>
          <li>82 Items</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
