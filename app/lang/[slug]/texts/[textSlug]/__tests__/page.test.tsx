import { Children, isValidElement, type ReactElement, type ReactNode } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

const {
  mockAuth,
  mockGrammarContent,
  mockLanguageFindUnique,
  mockTextFindUnique,
} = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockGrammarContent: vi.fn(() => null),
  mockLanguageFindUnique: vi.fn(),
  mockTextFindUnique: vi.fn(),
}))

vi.mock("@/auth", () => ({ auth: mockAuth }))
vi.mock("@/lib/prisma", () => ({
  prisma: {
    language: { findUnique: mockLanguageFindUnique },
    text: { findUnique: mockTextFindUnique },
  },
}))
vi.mock("@/components/grammar-content", () => ({
  GrammarContent: mockGrammarContent,
}))
vi.mock("@/components/text-sidebar", () => ({
  TextSidebar: () => null,
}))
vi.mock("@/lib/seo", () => ({
  breadcrumbJsonLd: vi.fn(() => ({})),
  DEFAULT_LOCALE: "en",
  getSiteUrl: vi.fn(() => "https://example.com"),
  jsonLdScriptContent: vi.fn(() => "{}"),
  languageContentJsonLd: vi.fn(() => ({})),
  languageOgImage: vi.fn(() => "https://example.com/language.png"),
  resolveAssetUrl: vi.fn((value) => value),
  SITE_NAME: "LingoCon",
  truncate: vi.fn((value) => value),
}))
vi.mock("@/lib/utils/tiptap-text", () => ({
  documentToPlainText: vi.fn(() => "Sample public text"),
}))

import PublicTextPage from "@/app/lang/[slug]/texts/[textSlug]/page"

type ElementWithChildren = ReactElement<{
  children?: ReactNode
  className?: string
}>

function findElement(
  node: ReactNode,
  predicate: (element: ElementWithChildren) => boolean
): ElementWithChildren | undefined {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(node)) {
    return undefined
  }
  if (predicate(node)) return node

  for (const child of Children.toArray(node.props.children)) {
    const match = findElement(child, predicate)
    if (match) return match
  }

  return undefined
}

describe("PublicTextPage", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuth.mockResolvedValue(null)
    mockLanguageFindUnique.mockResolvedValue({
      id: "language-1",
      name: "Sample Language",
      slug: "sample-language",
      visibility: "PUBLIC",
      ownerId: "owner-1",
      texts: [],
    })
    mockTextFindUnique.mockResolvedValue({
      id: "text-1",
      title: "Sample Text",
      slug: "sample-text",
      description: null,
      type: "ARTICLE",
      content: "Sample public text",
      fileUrl: null,
      fileName: null,
      coverImage: null,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
      updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      published: true,
      author: {
        id: "author-1",
        name: "Author",
        image: null,
      },
    })
  })

  it("does not force the custom script font on the full public text", async () => {
    const tree = await PublicTextPage({
      params: Promise.resolve({
        slug: "sample-language",
        textSlug: "sample-text",
      }),
    })

    const grammarContent = findElement(
      tree,
      (element) => element.type === mockGrammarContent
    )

    expect(grammarContent).toBeDefined()
    expect(grammarContent?.props.className ?? "").not.toMatch(
      /(?:^|\s)font-custom-script(?:\s|$)/
    )
  })
})
