import React, { useEffect, useMemo, useState } from "react";
import { RECIPES } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { SkeletonCard } from "../components/ui/SkeletonCard";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

// PUBLIC_INTERFACE
export default function Home({ debouncedSearch }) {
  /** Recipe listing page with responsive grid, skeleton state, and empty-state messaging. */
  const [loading, setLoading] = useState(true);

  // Simulate initial loading to showcase skeletons (no backend).
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = (debouncedSearch || "").trim().toLowerCase();
    if (!q) return RECIPES;

    return RECIPES.filter((r) => {
      const haystack = [
        r.title,
        r.description,
        r.cuisine,
        r.difficulty,
        ...(r.tags || []),
        ...(r.ingredients || []).map((i) => `${i.qty || ""} ${i.item}`),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [debouncedSearch]);

  return (
    <main className="main" role="main">
      <div className="container">
        <h1 className="page-title">Discover recipes with a retro sparkle</h1>
        <p className="page-subtitle">
          Search by name, tag, or ingredient. Everything runs locally—no backend required.
        </p>

        <div className="tags-row" aria-label="Quick hints">
          <Badge tone="primary">Try: “noodles”</Badge>
          <Badge tone="success">Try: “lemon”</Badge>
          <Badge tone="neutral">Try: “vegetarian”</Badge>
        </div>

        <div style={{ height: 14 }} />

        {loading ? (
          <section id="recipes" className="grid" aria-label="Loading recipes">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div className="grid-item" key={idx}>
                <SkeletonCard />
              </div>
            ))}
          </section>
        ) : filtered.length === 0 ? (
          <Card className="empty" role="status" aria-live="polite">
            <h2>No matches found</h2>
            <p>
              Try a different search term (e.g., <strong>curry</strong>, <strong>rice</strong>,{" "}
              <strong>quick</strong>).
            </p>
          </Card>
        ) : (
          <section id="recipes" className="grid" aria-label="Recipe results">
            {filtered.map((r) => (
              <div className="grid-item" key={r.id}>
                <RecipeCard recipe={r} />
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
