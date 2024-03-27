use Parking_Management_System


CREATE TABLE Employee (

		EmpId INT IDENTITY (1,1) PRIMARY KEY,
		FirstName varchar (30) NOT NULL,
		LastName varchar (30) NOT NULL,
		Gender varchar(30) NOT NULL,
		Emp_mailId varchar(30) NOT NULL,
		PhoneNumber bigint NOT NULL
);

CREATE TABLE Vehicle (
		
		VehicleId INT IDENTITY (1,1) Primary Key,
		Vehicle_RegistrationNo varchar(30) NOT NULL, 
		Vehicle_Type varchar (30) NOT NULL,
		vehicle_discription varchar (30) NOT NULL,
		EmpId int FOREIGN KEY REFERENCES Employee (EmpId)
);

CREATE TABLE ParkingSlot (

		ParkingSlot_No int NOT NULL Primary Key,
		Parking_Floor int NOT NULL, 
		parking_slot_status varchar (30) NOT NULL,
		ParkingSlot_Type varchar(30) NOT NULL,
		VehicleId int FOREIGN KEY REFERENCES Vehicle (VehicleId)
);

INSERT INTO ParkingSlot (ParkingSlot_No, Parking_Floor, parking_slot_status, ParkingSlot_Type)
VALUES (36, 2, 'available', 'car'),
       (37, 2, 'available', 'car'),
       (38, 2, 'available', 'car'),
	   (39, 2, 'available', 'car'),
	   (40, 2, 'available', 'car');
	   

Select * from ParkingSlot;
Select * from Vehicle;
Select * from Employee;

{
  "employee": {
    "firstName": "sinu",
    "lastName": "joshi",
    "gender": "female",
    "emp_mailId": "jitendra97524@gmail.com",
    "phoneNumber": 8939832324
  },
  "vehicle": {
    "vehicle_RegistrationNo": "MH-12 SJ 1234",
    "vehicle_Type": "car",
    "vehicle_discription": "White Color nano"  
  }
}
