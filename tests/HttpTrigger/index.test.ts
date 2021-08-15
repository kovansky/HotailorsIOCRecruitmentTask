import { Context } from "@azure/functions";
import { expect } from "chai";
import httpTrigger from "../../HttpTrigger/index";
import { instance, mock } from "ts-mockito";
import { Logger } from "../../commonServices/logger";

let context: Context;
let mockedLoggerClass: Logger;
let mockedLoggerInstance: Logger;

describe("Function", function () {
  this.beforeAll(function () {
    mockedLoggerClass = mock(Logger);
    mockedLoggerInstance = instance(mockedLoggerClass);

    context = ({ log: mockedLoggerInstance }) as unknown as Context;
  });

  it("should return bulbasaur and ivysaur", async function () {
    const data = {
      input: {
        id: "1,2,5",
        type: "grass",
      },
      output: ["bulbasaur", "ivysaur"],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return charmeleon", async function () {
    const data = {
      input: {
        id: "1,2,5",
        type: "fire",
      },
      output: ["charmeleon"],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return empty array (no matches)", async function () {
    const data = {
      input: {
        id: "1,2",
        type: "fire",
      },
      output: [],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should ignore non-numeric ids and return charmeleon", async function () {
    const data = {
      input: {
        id: "a,b,5",
        type: "fire",
      },
      output: ["charmeleon"],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return empty array (no ids)", async function () {
    const data = {
      input: {
        id: "",
        type: "fire",
      },
      output: [],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return empty array (no type)", async function () {
    const data = {
      input: {
        id: "1,2,5",
        type: "",
      },
      output: [],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return empty array (empty parameters)", async function () {
    const data = {
      input: {
        id: "",
        type: "",
      },
      output: [],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });

  it("should return empty array (no data)", async function () {
    const data = {
      input: {},
      output: [],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });
});
