import React from "react";

const doctorsData = [
  {
    name: "Dr. John Smith",
    specialization: "Cardiologist",
    availableDays: "Mon, Wed, Fri",
  },
  {
    name: "Dr. Emily Johnson",
    specialization: "Dermatologist",
    availableDays: "Tue, Thu",
  },
  {
    name: "Dr. Michael Lee",
    specialization: "Neurologist",
    availableDays: "Mon, Tue, Fri",
  },
  {
    name: "Dr. Olivia Davis",
    specialization: "Pediatrician",
    availableDays: "Wed, Thu",
  },
  {
    name: "Dr. William Brown",
    specialization: "Orthopedic Surgeon",
    availableDays: "Tue, Thu, Sat",
  },
  {
    name: "Dr. Sophia Wilson",
    specialization: "Gynecologist",
    availableDays: "Mon, Wed",
  },
];

const Doctors = () => {
  return (
    
      <div className="w-full   bg-white shadow-lg  p-8 sm:p-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Our Doctors
        </h2>
        <div className="w-full flex justify-center items-center rounded-lg px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
            {doctorsData.map(({ name, specialization, availableDays }, index) => (
              <div key={index} className="card bg-base-100 w-full max-w-60 shadow-sm rounded-lg">
                <figure>
                  <img
                    src="/doc.png"
                    alt={name}
                    className="rounded-t-lg object-cover  w-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <p className="text-gray-600 font-medium">{specialization}</p>
                  <p className="text-sm text-gray-500">Available Days: {availableDays}</p>
                </div>
                <h1>hi</h1>
                 <h1>hi</h1>
                  <h1>hi</h1>
                    <h1>hi</h1>
                    <h1>hi</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default Doctors;