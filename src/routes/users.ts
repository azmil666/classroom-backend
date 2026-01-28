import { Router } from "express";
import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import { roleEnum, user } from "../db/schema/index.js";
import { db } from "../db/index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { search, role, page = "1", limit = "10" } = req.query;

        const searchStr = typeof search === "string" ? search : undefined;
        const roleStr =
            typeof role === "string" ? role : undefined;

        const currentPage = Math.max(1, Number(page) || 1);
        const limitPerPage = Math.min(100, Math.max(1, Number(limit) || 10));
        const offset = (currentPage - 1) * limitPerPage;

        const filterConditions = [];

        if (searchStr) {
            filterConditions.push(
                or(
                    ilike(user.name, `%${searchStr}%`),
                    ilike(user.email, `%${searchStr}%`)
                )
            );
        }

        if (roleStr && roleEnum.enumValues.includes(roleStr as (typeof roleEnum.enumValues)[number])) {
            filterConditions.push(
                eq(user.role, roleStr as (typeof roleEnum.enumValues)[number])
            );
        }

        const whereClause =
            filterConditions.length > 0 ? and(...filterConditions) : undefined;

        // ✅ Count query
        const countQuery = db
            .select({ count: sql<number>`count(*)` })
            .from(user);

        if (whereClause) {
            countQuery.where(whereClause);
        }

        const countResult = await countQuery;
        const totalCount = Number(countResult[0]?.count ?? 0);

        // ✅ Data query
        const dataQuery = db
            .select(getTableColumns(user))
            .from(user)
            .orderBy(desc(user.createdAt))
            .limit(limitPerPage)
            .offset(offset);

        if (whereClause) {
            dataQuery.where(whereClause);
        }

        const usersList = await dataQuery;

        res.status(200).json({
            data: usersList,
            pagination: {
                page: currentPage,
                limit: limitPerPage,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limitPerPage),
            },
        });
    } catch (e) {
        console.error("GET /users error:", e);
        res.status(500).json({ error: "Failed to get users" });
    }
});

export default router;
