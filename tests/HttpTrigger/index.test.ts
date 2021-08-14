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
});

describe("Time benchmark", function () {
  this.beforeAll(function () {
    mockedLoggerClass = mock(Logger);
    mockedLoggerInstance = instance(mockedLoggerClass);

    context = ({ log: mockedLoggerInstance }) as unknown as Context;
  });

  it("100 entries", async function () {
    const data = {
      input: {
        id:
          "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100",
        type: "fire",
      },
      output: [
        "charmander",
        "charmeleon",
        "charizard",
        "vulpix",
        "ninetales",
        "growlithe",
        "arcanine",
        "ponyta",
        "rapidash",
      ],
    };

    await httpTrigger(context, { query: data.input });

    expect(context.res.status).to.equal(200);
    expect(context.res.body).to.have.property("pokemons").with.lengthOf(
      data.output.length,
    ).to
      .have.members(data.output);
  });
});
