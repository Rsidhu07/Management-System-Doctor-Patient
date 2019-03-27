import { Mongo } from 'meteor/mongo';

const PatientDocRecords = new Mongo.Collection('patientDocRecords');

export default PatientDocRecords;

export const PatientSurgeryRecords = new Mongo.Collection('patientSurgeryRecords');

export const PatientVisitRecords = new Mongo.Collection('patientVisitRecords');