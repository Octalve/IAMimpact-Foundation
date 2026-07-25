import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("event and insight detail routes are implemented", async () => {
  const [eventRoute, insightRoute] = await Promise.all([
    read("app/events/[slug]/page.tsx"),
    read("app/insights/[slug]/page.tsx"),
  ]);
  assert.match(eventRoute, /generateStaticParams/);
  assert.match(eventRoute, /EventRegistrationForm/);
  assert.match(insightRoute, /generateStaticParams/);
  assert.match(insightRoute, /getInsight/);
});

test("public insight page contains no editorial placeholder instructions", async () => {
  const [page, content] = await Promise.all([
    read("app/insights/page.tsx"),
    read("content/insights.ts"),
  ]);
  assert.doesNotMatch(page, /How to add more/i);
  assert.doesNotMatch(content, /How to add more/i);
});

test("all involvement pathways have dedicated routes", async () => {
  const page = await read("app/get-involved/page.tsx");
  for (const route of [
    "/get-involved/volunteer",
    "/get-involved/school-engagement",
    "/get-involved/community-project",
    "/get-involved/partnership",
  ]) {
    assert.match(page, new RegExp(route));
  }
});
