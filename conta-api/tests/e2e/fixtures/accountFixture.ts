import request from 'supertest';
import { app } from "../../../src/app";

export async function createAccount(params) : Promise<request.Response> {
  return await request(app).get("/account/new").query(params).send();
}

export async function listAccounts() : Promise<request.Response> {
  return await request(app).get("/accounts");
}

export async function withdraw(id: string, params) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/withdraw").query(params).send();
}

export async function deposit(id: string, params) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/deposit").query(params).send();
}

export async function paymentTo(id: string, receiver: string, params) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/payment/to/" + receiver).query(params).send();
}

export async function listTransactions(id: string) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/transactions");
}

export async function getBalance(id: string) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/balance");
}

export async function listAccountsForPayment(id: string) : Promise<request.Response> {
  return await request(app).get("/account/" + id + "/accountsForPayment");
}