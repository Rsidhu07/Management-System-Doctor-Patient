import { Mongo } from 'meteor/mongo';

const PatientRecords = new Mongo.Collection('patientrecords');

export default PatientRecords;

export const PatientSurgeryRecords = new Mongo.Collection('patientSurgeryRecords');
