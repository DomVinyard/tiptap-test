# Experiments Structure

## Experiment Organization

- Each experiment in the application is isolated and self-contained.
- Experiments are defined in `src/app/page.tsx` as separate entries with unique IDs.
- Each experiment has its own route following the pattern `/{experiment-id}`.
- Experiments are sorted by date (newest first) in the home page listing.

## Experiment Properties

Experiments have the following properties:
- `id`: Unique identifier used for routing (e.g., 'traceview-tests')
- `title`: Display name shown on the homepage
- `description`: Brief explanation of the experiment's purpose
- `date`: Release/creation date in ISO format

## Creating New Experiments

When creating a new experiment:
1. Add the experiment entry to the `experiments` array in `src/app/page.tsx`
2. Create a corresponding route directory under `src/app/{experiment-id}`
3. Implement experiment-specific components and logic isolated within this directory
4. Maintain the experiment's self-contained nature - don't rely on other experiments' code

## Example Structure

```
src/app/
├── page.tsx               # Main homepage listing all experiments
├── traceview-tests/       # Experiment directory
│   ├── page.tsx           # Experiment's main page
│   └── components/        # Experiment-specific components
├── agents-studio/
│   ├── page.tsx
│   └── ...
```

## Best Practices

- Keep experiment code isolated within its directory
- Use shared components from `/src/components` when needed
- Document experiment purposes clearly in descriptions
- Follow consistent naming and routing patterns 