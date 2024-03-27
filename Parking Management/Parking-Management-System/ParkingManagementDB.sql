use Parking_Management_System;


CREATE TABLE Employee (

		EmpId int NOT NULL PRIMARY KEY,
		FirstName varchar (30) NOT NULL,
		LastName varchar (30) NOT NULL,
		Gender varchar(30) NOT NULL,
		Emp_mailId varchar(30) NOT NULL,
		PhoneNumber bigint NOT NULL UNIQUE,
	
);

CREATE TABLE Vehicle (
		
		Vehicle_RegistrationNo varchar(30) NOT NULL PRIMARY KEY, 
		Vehicle_Type varchar (30) NOT NULL,
		vehicle_discription varchar (30) NOT NULL
		
);

CREATE TABLE ParkingSlot (
		
		--EmpId int NOT NULL FOREIGN KEY REFERENCES Employee (EmpId),
		ParkingSlot_No int NOT NULL Primary Key,
		Parking_Floor int NOT NULL, 
		parking_slot_status varchar (30) NOT NULL,
		ParkingSlot_Type varchar(30) NOT NULL
);

ALTER TABLE ParkingSlot DROP COLUMN EmpId;

alter table ParkingSlot add Vehicle_RegistrationNo varchar(30) NOT NULL;

ALTER TABLE ParkingSlot
ADD CONSTRAINT FK_ParkingSlot
FOREIGN KEY (Vehicle_RegistrationNo) REFERENCES Vehicle(Vehicle_RegistrationNo);

--alter table ParkingSlot add Vehicle_Type varchar(30) NOT NULL;

--alter table ParkingSlot add constraint FK_VehicleType Foreign Key (Vehicle_Type)  
--References Vehicle (Vehicle_Type);

CREATE TABLE Employee_Vehicle (
		EmpId int NOT NULL FOREIGN KEY REFERENCES Employee (EmpId),
		Vehicle_RegistrationNo varchar(30) NOT NULL FOREIGN KEY REFERENCES Vehicle (Vehicle_RegistrationNo)

		Constraint PK_Vehicle_Employee PRIMARY KEY (EmpId,Vehicle_RegistrationNo)
);

insert into Employee values (1,'jeet','patil','male','jeet.patil@email.com',7755971235);
insert into Employee values (2,'vishal','thorat','male','thoratvishu@email.com',9336040333);
insert into Employee values (3,'hemali','warude','female','hwarude87@email.com',7755889345);

select * from Employee;
select * from Vehicle;
select * from ParkingSlot;
select * from Employee_Vehicle;

