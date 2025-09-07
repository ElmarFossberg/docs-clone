import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";


export const getAllDocuments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, {paginationOpts, search}) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => 
          q.search("title", search).eq("ownerId", user.subject))
        .paginate(paginationOpts);
    } else {
      return await ctx.db.query("documents").withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject)).order("desc").paginate(paginationOpts);
    }

  },
});

export const createDocument = mutation({
  args: {title: v.optional(v.string()), initialContent: v.optional(v.string())},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    const documentId = await ctx.db.insert("documents", {
      title: args.title || "Untitled Document",
      ownerId: user.subject,
      initialContent: args.initialContent,
      lastUpdated: new Date().toISOString(),
    })
    return documentId;
  },
})

export const deleteDocument = mutation({
  args: {id: v.id("documents")},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found")
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unathorized")
    }

    return await ctx.db.delete(args.id);

  }
})

export const updateDocumentConent = mutation({
  args: {id: v.id("documents"), content: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found")
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unathorized")
    }
    return await ctx.db.patch(args.id, {content: args.content, lastUpdated: new Date().toISOString()});

  }
})
export const updateDocumentTitle = mutation({
  args: {id: v.id("documents"), title: v.string()},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found")
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unathorized")
    }
    return await ctx.db.patch(args.id, {title: args.title, lastUpdated: new Date().toISOString()});

  }
})

export const getById = query({
  args: {id: v.id("documents")},
  handler: async (ctx, {id}) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError("Unathorized")
    }
    const document = await ctx.db.get(id);
    if (!document) {
      throw new ConvexError("Document not found")
    }
     const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError("Unathorized")
    }
    return document;
  }
})