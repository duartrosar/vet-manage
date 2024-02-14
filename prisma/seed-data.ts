// Correctly Generated TypeScript objects for mock data

import { User, UserRole, Vet } from "@prisma/client";
import { hash } from "bcryptjs";

async function getPassword() {
  const password = await hash("123456", 12);
  return password;
}

interface PetSeed {
  name: string;
  type: string;
}

interface OwnerSeed {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  mobileNumber: string;
  address: string;
  pets: PetSeed[];
}

interface MockData {
  vets: any;
  owners: OwnerSeed[];
}

// Vets
const vets = [
  {
    firstName: "John",
    lastName: "Duarte",
    dateOfBirth: new Date(1965, 5, 31),
    gender: "Male",
    email: "brightnathan@phillips.com",
    mobileNumber: "066.911.1614x4078",
    address: "32051 Edwards Pike Suite 944\nNorth Jacobville, SD 51596",
  },
  {
    firstName: "Nicholas",
    lastName: "Chung",
    dateOfBirth: new Date(1976, 2, 5),
    gender: "Male",
    email: "frazierethan@gmail.com",
    mobileNumber: "873-083-6403",
    address: "89840 Gregory Street Suite 015\nNorth Tammy, MS 76317",
  },
  {
    firstName: "Michael",
    lastName: "Bryant",
    dateOfBirth: new Date(1990, 11, 27),
    gender: "Male",
    email: "rileycrystal@hancock.com",
    mobileNumber: "(827)439-9245x863",
    address: "639 Rodriguez Keys\nRobertport, HI 48602",
  },
  {
    firstName: "April",
    lastName: "Kelly",
    dateOfBirth: new Date(1965, 9, 18),
    gender: "Female",
    email: "qrusso@collins.com",
    mobileNumber: "700.738.9510x960",
    address: "07275 Anderson Courts\nWest Kyletown, ND 30488",
  },
  {
    firstName: "Michelle",
    lastName: "Palmer",
    dateOfBirth: new Date(1990, 10, 15),
    gender: "Female",
    email: "michaelakidd@gmail.com",
    mobileNumber: "001-851-027-4457",
    address: "503 Deleon Causeway Apt. 588\nEast Mia, WV 23654",
  },
];
// Owners
const owners: OwnerSeed[] = [
  {
    firstName: "Jaime",
    lastName: "Miles",
    dateOfBirth: new Date(1959, 8, 17),
    gender: "Male",
    email: "georgehess@yahoo.com",
    mobileNumber: "886.912.1586x125",
    address: "69713 Amy Mountains Suite 007\nNorth Claudia, AK 95820",
    pets: [
      { name: "James", type: "Dog" },
      { name: "Stephen", type: "Dog" },
    ],
  },
  {
    firstName: "Marie",
    lastName: "Li",
    dateOfBirth: new Date(1972, 5, 20),
    gender: "Female",
    email: "hramirez@yahoo.com",
    mobileNumber: "+1-209-663-8859x59267",
    address: "PSC 0479, Box 4857\nAPO AP 14283",
    pets: [{ name: "Alex", type: "Cat" }],
  },
  {
    firstName: "Kelly",
    lastName: "Jones",
    dateOfBirth: new Date(1958, 9, 10),
    gender: "Female",
    email: "pricegregory@hotmail.com",
    mobileNumber: "307-306-6792x7237",
    address: "217 Horne Islands\nRobertsburgh, WI 82144",
    pets: [{ name: "Robert", type: "Cat" }],
  },
  {
    firstName: "Brandon",
    lastName: "Morris",
    dateOfBirth: new Date(1963, 11, 5),
    gender: "Male",
    email: "andersonchase@clark.org",
    mobileNumber: "+1-285-694-9598x121",
    address: "424 Strickland Summit Suite 019\nNorth Heatherport, DE 85784",
    pets: [
      { name: "Rita", type: "Cat" },
      { name: "Jake", type: "Cat" },
    ],
  },
  {
    firstName: "Sean",
    lastName: "Landry",
    dateOfBirth: new Date(1959, 12, 9),
    gender: "Male",
    email: "jesus76@hotmail.com",
    mobileNumber: "001-269-977-9918x485",
    address: "USNV Mclaughlin\nFPO AE 74804",
    pets: [
      { name: "Marissa", type: "Cat" },
      { name: "Sean", type: "Cat" },
    ],
  },
  {
    firstName: "Jason",
    lastName: "Rogers",
    dateOfBirth: new Date(1961, 8, 10),
    gender: "Male",
    email: "williamsamy@larson.com",
    mobileNumber: "(550)185-9466",
    address: "23137 Dixon Burg Suite 106\nWilsonhaven, MD 03236",
    pets: [
      { name: "Mary", type: "Cat" },
      { name: "Carrie", type: "Cat" },
    ],
  },
  {
    firstName: "Ryan",
    lastName: "Herman",
    dateOfBirth: new Date(1982, 2, 27),
    gender: "Male",
    email: "benjamin10@burgess.com",
    mobileNumber: "6749270385",
    address: "0090 Kenneth Locks\nDanielville, WV 59729",
    pets: [{ name: "Justin", type: "Dog" }],
  },
  {
    firstName: "Todd",
    lastName: "Garcia",
    dateOfBirth: new Date(1976, 9, 13),
    gender: "Male",
    email: "watsonmary@santos-johnson.com",
    mobileNumber: "621-705-9917x6567",
    address: "Unit 6835 Box 8885\nDPO AA 93713",
    pets: [{ name: "Amy", type: "Cat" }],
  },
  {
    firstName: "Nicole",
    lastName: "Ross",
    dateOfBirth: new Date(1963, 3, 29),
    gender: "Female",
    email: "jack64@mccullough.com",
    mobileNumber: "(947)431-8811x1584",
    address: "951 Thompson Islands Suite 371\nDayfurt, NM 93637",
    pets: [{ name: "Dan", type: "Cat" }],
  },
  {
    firstName: "Whitney",
    lastName: "Fisher",
    dateOfBirth: new Date(1978, 2, 16),
    gender: "Female",
    email: "rebecca64@gmail.com",
    mobileNumber: "(028)173-6925x1667",
    address: "8310 Malik Track\nDavidsonstad, WY 56992",
    pets: [
      { name: "Alexis", type: "Cat" },
      { name: "Anthony", type: "Dog" },
    ],
  },
];

interface ShortenedAppointment {
  subject: string;
  startTime: Date;
  endTime: Date;
  description: string;
  vetId: number;
  petId: number;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomYear(): number {
  const years = [2023, 2024];
  return years[Math.floor(Math.random() * years.length)];
}

function getRandomTime(
  minHour: number,
  maxHour: number,
  year: number,
  month: number,
  day: number,
): Date {
  const hour = getRandomInt(minHour, maxHour);
  const minutes = getRandomInt(0, 1) * 30; // 0 or 30
  return new Date(year, month, day, hour, minutes);
}

function generateAppointments(count: number): ShortenedAppointment[] {
  const appointments: ShortenedAppointment[] = [];

  for (let i = 0; i < count; i++) {
    const year = getRandomYear();
    const month = getRandomInt(0, 11);
    const day = getRandomInt(1, 28);
    const startTime = getRandomTime(9, 17, year, month, day);
    let endTime = getRandomTime(9, 18, year, month, day);

    while (
      endTime <= startTime ||
      endTime.getHours() < 9 ||
      (endTime.getHours() === 9 && endTime.getMinutes() < 30)
    ) {
      endTime = getRandomTime(9, 18, year, month, day);
    }

    appointments.push({
      subject: `Appointment ${i + 1}`,
      startTime,
      endTime,
      description: `Description for appointment ${i + 1}`,
      vetId: getRandomInt(1, 6),
      petId: getRandomInt(1, 15),
    });
  }

  return appointments;
}

// Example: Generate 5 appointments
// const appointments = generateAppointments(5);

export { vets, owners, generateAppointments };
