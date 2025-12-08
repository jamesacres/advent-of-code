export const getDistance = (p: string, q: string): number => {
  const [p1, p2, p3] = p.split(",").map(Number);
  const [q1, q2, q3] = q.split(",").map(Number);
  return Math.sqrt(
    Math.pow(p1 - q1, 2) + Math.pow(p2 - q2, 2) + Math.pow(p3 - q3, 2),
  );
};

export const getDistances = (
  coordinates: string[],
): { [destinationIndex: number]: number }[] => {
  return coordinates.map((coordinate) => {
    return coordinates.reduce(
      (
        result: { [destinationIndex: number]: number },
        destinationCoordinate,
        destinationIndex,
      ) => {
        if (coordinate !== destinationCoordinate) {
          result[destinationIndex] = getDistance(
            coordinate,
            destinationCoordinate,
          );
        }
        return result;
      },
      {},
    );
  });
};

export const sortDistances = (
  distances: { [destinationIndex: number]: number }[],
) =>
  Object.entries(distances.reduce(
    (result: { [fromTo: string]: number }, distance, from) => {
      for (const [to, value] of Object.entries(distance)) {
        if (Number(from) < Number(to)) {
          result[`${from}-${to}`] = value;
        }
      }
      return result;
    },
    {},
  )).sort(([_aFromTo, aDistance], [_bFromTo, bDistance]) =>
    aDistance - bDistance
  );

export const makeCircuits = (shortestDistances: [string, number][]) => {
  const circuits: [string, number][][] = [];
  for (const distance of shortestDistances) {
    const [connection, _value] = distance;
    const [from, to] = connection.split("-");

    const existingCircuitFrom = circuits.findIndex((circuit) =>
      circuit.find(([thisFromTo]) => {
        const [thisFrom, thisTo] = thisFromTo.split("-");
        return thisFrom === from || thisTo === from;
      })
    );
    const existingCircuitTo = circuits.findIndex((circuit) =>
      circuit.find(([thisFromTo]) => {
        const [thisFrom, thisTo] = thisFromTo.split("-");
        return thisFrom === to || thisTo === to;
      })
    );

    if (existingCircuitFrom === -1 && existingCircuitTo === -1) {
      console.warn(`create new circuit for ${from} and ${to}`);
      circuits.push([distance]);
    } else if (existingCircuitFrom === existingCircuitTo) {
      console.warn(
        `skip as both ${from} and ${to} already in same circuit ${existingCircuitFrom}`,
      );
    } else if (existingCircuitFrom > -1 && existingCircuitTo > -1) {
      console.warn(
        `merge circuits ${existingCircuitFrom} containing ${from} with ${existingCircuitTo} containing ${to}`,
      );
      const [minIndex, maxIndex] = [existingCircuitFrom, existingCircuitTo]
        .sort();
      circuits[minIndex].push(...circuits[maxIndex]);
      circuits[maxIndex] = [];
    } else if (existingCircuitFrom > -1) {
      console.warn(
        `add ${to} into circuit ${existingCircuitFrom} containing ${from}`,
      );
      circuits[existingCircuitFrom].push(distance);
    } else if (existingCircuitTo > -1) {
      console.warn(
        `add ${from} into circuit ${existingCircuitTo} containing ${to}`,
      );
      circuits[existingCircuitTo].push(distance);
    } else {
      throw Error("unexpected else");
    }
  }
  return circuits.filter((circuit) => circuit.length);
};
