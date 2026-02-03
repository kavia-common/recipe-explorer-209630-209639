import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Rating } from "./ui/Rating";

// PUBLIC_INTERFACE
export function RecipeCard({ recipe }) {
  /** Card for the recipe list grid. Entire card acts as a link for keyboard navigation. */
  return (
    <Card hover className="recipe-card">
      <Link className="recipe-card-link" to={`/recipes/${recipe.id}`} aria-label={`View recipe: ${recipe.title}`}>
        <div className="recipe-thumb">
          <img
            src={recipe.image}
            alt={`Photo placeholder for ${recipe.title}`}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="recipe-body">
          <div>
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-desc">{recipe.description}</p>
          </div>

          <div className="tags-row" aria-label="Recipe tags">
            <Badge tone="primary">{recipe.cuisine}</Badge>
            <Badge tone="neutral">{recipe.difficulty}</Badge>
            <Badge tone="success">{recipe.timeMinutes} min</Badge>
          </div>

          <div className="recipe-meta">
            <Rating value={recipe.rating} />
            {recipe.tags.slice(0, 2).map((t) => (
              <Badge key={t} tone="neutral">#{t}</Badge>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  );
}
