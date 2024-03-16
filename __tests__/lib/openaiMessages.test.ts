/*
 * @jest-environment node
 */
import { ComparisonRequest, userMessage } from '@/lib/openaiMessages';
import { Jet } from '@prisma/client';

describe('userMessage', () => {
  it('should return correct message for top speed comparison', () => {
    const input: ComparisonRequest = {
      planes: [{ name: 'Jet A' } as Jet, { name: 'Jet B' } as Jet],
      metric: 'top speed',
    };

    const result = userMessage(input);

    expect(result.content).toContain(
      'Please rank the following aircraft based on top speed'
    );
    expect(result.content).toContain('Jet A');
    expect(result.content).toContain('Jet B');
    expect(result.content).toContain(
      'the top speed of the plane in Mach number'
    );
  });

  it('should return correct message for fuel efficiency comparison', () => {
    const input: ComparisonRequest = {
      planes: [{ name: 'Jet A' } as Jet, { name: 'Jet B' } as Jet],
      metric: 'fuel efficiency',
    };

    const result = userMessage(input);

    expect(result.content).toContain(
      'Please rank the following aircraft based on fuel efficiency'
    );
    expect(result.content).toContain('Jet A');
    expect(result.content).toContain('Jet B');
    expect(result.content).toContain(
      'the fuel consumption of the plane in gallons per hour'
    );
  });

  it('should return correct message for max seats comparison', () => {
    const input: ComparisonRequest = {
      planes: [{ name: 'Jet A' } as Jet, { name: 'Jet B' } as Jet],
      metric: 'max seats',
    };

    const result = userMessage(input);

    expect(result.content).toContain(
      'Please rank the following aircraft based on max seats'
    );
    expect(result.content).toContain('Jet A');
    expect(result.content).toContain('Jet B');
    expect(result.content).toContain(
      'the number of seats in the plane using the metric "seats"'
    );
  });

  it('should handle no planes', () => {
    const input: ComparisonRequest = {
      planes: [],
      metric: 'top speed',
    };

    const result = userMessage(input);

    expect(result.content).toContain(
      'Please rank the following aircraft based on top speed'
    );
    expect(result.content).not.toContain('Jet A');
    expect(result.content).not.toContain('Jet B');
    expect(result.content).toContain(
      'the top speed of the plane in Mach number'
    );
  });
});
