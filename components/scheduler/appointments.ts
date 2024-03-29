export interface Appointment {
  id: number;
  subject: string;
  vetName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  vetId: number;
  petId: number;
}

export const appointments: Appointment[] = [
  {
    id: 1,
    subject: "Explosion of Betelgeuse Star",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-06T09:00:00.000Z"),
    endTime: new Date("2024-01-06T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 2,
    subject: "Thule Air Crash Report",
    vetName: "Newyork City",
    startTime: new Date("2024-01-07T13:30:00.000Z"),
    endTime: new Date("2024-01-07T14:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 3,
    subject: "Blue Moon Eclipse",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-08T15:00:00.000Z"),
    endTime: new Date("2024-01-08T15:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 4,
    subject: "Meteor Showers in 2018",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-09T11:30:00.000Z"),
    endTime: new Date("2024-01-09T13:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 5,
    subject: "Milky Way as Melting pot",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-10T09:30:00.000Z"),
    endTime: new Date("2024-01-10T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 6,
    subject: "Mysteries of Bermuda Triangle",
    vetName: "Bermuda",
    startTime: new Date("2024-01-10T16:00:00.000Z"),
    endTime: new Date("2024-01-10T17:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 7,
    subject: "Glaciers and Snowflakes",
    vetName: "Himalayas",
    startTime: new Date("2024-01-11T13:30:00.000Z"),
    endTime: new Date("2024-01-11T15:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 8,
    subject: "Life on Mars",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-12T17:30:00.000Z"),
    endTime: new Date("2024-01-12T18:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 9,
    subject: "Alien Civilization",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-14T12:30:00.000Z"),
    endTime: new Date("2024-01-14T13:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 10,
    subject: "Wildlife Galleries",
    vetName: "Africa",
    startTime: new Date("2024-01-16T09:30:00.000Z"),
    endTime: new Date("2024-01-16T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 11,
    subject: "Best Photography 2018",
    vetName: "London",
    startTime: new Date("2024-01-17T13:00:00.000Z"),
    endTime: new Date("2024-01-17T14:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 12,
    subject: "Smarter Puppies",
    vetName: "Sweden",
    startTime: new Date("2024-01-04T09:30:00.000Z"),
    endTime: new Date("2024-01-04T10:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 13,
    subject: "Myths of Andromeda Galaxy",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-02T10:00:00.000Z"),
    endTime: new Date("2024-01-02T13:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 14,
    subject: "Aliens vs Humans",
    vetName: "Research Centre of USA",
    startTime: new Date("2024-01-01T13:30:00.000Z"),
    endTime: new Date("2024-01-01T18:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 15,
    subject: "Facts of Humming Birds",
    vetName: "California",
    startTime: new Date("2024-01-15T10:00:00.000Z"),
    endTime: new Date("2024-01-15T11:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 16,
    subject: "Sky Gazers",
    vetName: "Alaska",
    startTime: new Date("2024-01-18T13:30:00.000Z"),
    endTime: new Date("2024-01-18T16:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 17,
    subject: "The Cycle of Seasons",
    vetName: "Research Centre of USA",
    startTime: new Date("2024-01-07T17:00:00.000Z"),
    endTime: new Date("2024-01-07T02:18:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 18,
    subject: "Space Galaxies and Planets",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-07T17:30:00.000Z"),
    endTime: new Date("2024-01-07T18:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 19,
    subject: "Lifecycle of Bumblebee",
    vetName: "San Fransisco",
    startTime: new Date("2024-01-10T9:30:00.000Z"),
    endTime: new Date("2024-01-10T011:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 20,
    subject: "Alien Civilization",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-10T10:30:00.000Z"),
    endTime: new Date("2024-01-10T12:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 21,
    subject: "Alien Civilization",
    vetName: "Space Centre USA",
    startTime: new Date("2024-01-06T09:30:00.000Z"),
    endTime: new Date("2024-01-06T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 22,
    subject: "The Cycle of Seasons",
    vetName: "Research Centre of USA",
    startTime: new Date("2024-01-08T09:00:00.000Z"),
    endTime: new Date("2024-01-08T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 23,
    subject: "Sky Gazers",
    vetName: "Greenland",
    startTime: new Date("2024-01-11T09:00:00.000Z"),
    endTime: new Date("2024-01-11T10:30:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
  {
    id: 24,
    subject: "Facts of Humming Birds",
    vetName: "California",
    startTime: new Date("2024-01-12T12:00:00.000Z"),
    endTime: new Date("2024-01-12T13:00:00.000Z"),
    description: "This is a description for my appointment.",
    petId: 1,
    vetId: 1,
  },
];
