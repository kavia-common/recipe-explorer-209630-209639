import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RECIPE_INDEX_BY_ID } from "../data/recipes";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Rating } from "../components/ui/Rating";

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Detailed recipe view page. */
  const { recipeId } = useParams();
  const recipe = RECIPE_INDEX_BY_ID.get(recipeId);

  const [servings, setServings] = useState(recipe?.servings ?? 1);
  const [checked, setChecked] = useState(() => new Set());

  const scaledIngredients = useMemo(() => {
    if (!recipe) return [];
    const base = recipe.servings || 1;
    const ratio = base > 0 ? servings / base : 1;

    // If ingredient quantity starts with a number, scale it (best-effort).
    return recipe.ingredients.map((ing, idx) => {
      const qty = ing.qty || "";
      const m = qty.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (!m) return { ...ing, _key: idx };
      const n = Number(m[1]);
      if (!Number.isFinite(n)) return { ...ing, _key: idx };
      const scaled = (n * ratio);
      const pretty = Number.isInteger(scaled) ? String(scaled) : scaled.toFixed(1).replace(/\.0$/, "");
      return { ...ing, qty: `${pretty}${m[2]}`, _key: idx };
    });
  }, [recipe, servings]);

  if (!recipe) {
    return (
      <main className="main" role="main">
        <div className="container">
          <div className="breadcrumb">
            <Button as={Link} to="/" variant="ghost" size="small">
              ← Back
            </Button>
          </div>
          <Card className="notfound">
            <h1 className="page-title">Recipe not found</h1>
            <p className="page-subtitle">That recipe ID doesn’t exist in the local cookbook.</p>
            <Button as={Link} to="/" variant="primary">Return home</Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="main" role="main">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Button as={Link} to="/" variant="ghost" size="small">
            ← Back to recipes
          </Button>
        </nav>

        <div className="detail-hero" aria-label="Recipe hero image">
          <img src={recipe.image} alt={`Hero image placeholder for ${recipe.title}`} loading="lazy" decoding="async" />
        </div>

        <header className="detail-head">
          <div>
            <h1 className="detail-title">{recipe.title}</h1>
            <p className="detail-sub">{recipe.description}</p>

            <div className="detail-topmeta" aria-label="Recipe metadata">
              <Badge tone="primary">{recipe.cuisine}</Badge>
              <Badge tone="neutral">{recipe.difficulty}</Badge>
              <Badge tone="success">{recipe.timeMinutes} min</Badge>
              <Badge tone="neutral">{recipe.tags.length} tags</Badge>
              <Rating value={recipe.rating} />
            </div>

            <div className="servings" aria-label="Servings control">
              <span style={{ fontWeight: 800 }}>Servings</span>
              <Button
                type="button"
                size="small"
                variant="ghost"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                aria-label="Decrease servings"
              >
                −
              </Button>
              <span className="servings-value" aria-live="polite">{servings}</span>
              <Button
                type="button"
                size="small"
                variant="ghost"
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                aria-label="Increase servings"
              >
                +
              </Button>
            </div>
          </div>

          <Card className="panel" style={{ minWidth: 260 }}>
            <h2>Nutrition (est.)</h2>
            <dl className="kv">
              <dt>Calories</dt><dd>{recipe.nutrition.calories}</dd>
              <dt>Protein</dt><dd>{recipe.nutrition.proteinG}g</dd>
              <dt>Carbs</dt><dd>{recipe.nutrition.carbsG}g</dd>
              <dt>Fat</dt><dd>{recipe.nutrition.fatG}g</dd>
            </dl>

            <div style={{ height: 12 }} />
            <div className="tags-row" aria-label="All tags">
              {recipe.tags.map((t) => (
                <Badge key={t} tone="neutral">#{t}</Badge>
              ))}
            </div>
          </Card>
        </header>

        <section className="detail-grid" aria-label="Recipe details">
          <Card className="panel">
            <h2>Ingredients</h2>
            <ul className="checklist" aria-label="Ingredients checklist">
              {scaledIngredients.map((ing, idx) => {
                const id = `ing-${recipe.id}-${idx}`;
                const isChecked = checked.has(id);
                return (
                  <li className="check-item" key={id}>
                    <input
                      id={id}
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        setChecked((prev) => {
                          const next = new Set(prev);
                          if (e.target.checked) next.add(id);
                          else next.delete(id);
                          return next;
                        });
                      }}
                    />
                    <label htmlFor={id}>
                      <span style={{ fontWeight: 800 }}>{ing.qty ? `${ing.qty} ` : ""}</span>
                      <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
                        {ing.item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="panel">
            <h2>Steps</h2>
            <ol className="steps" aria-label="Cooking steps">
              {recipe.steps.map((s, idx) => (
                <li className="step" key={idx}>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 4 }}>Step {idx + 1}</div>
                    <div style={{ color: "rgba(17,24,39,.78)" }}>{s}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </section>
      </div>
    </main>
  );
}
