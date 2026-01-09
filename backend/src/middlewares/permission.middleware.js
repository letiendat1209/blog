
// export const requireRole = (...roles) => {
//   return (req, res, next) => {
//     console.log("USER ROLE:", req.user?.role);
//     console.log("REQUIRED ROLES:", roles);

//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ error: "Forbidden x" });
//     }
//     next();
//   };
// };
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    if (req.user.role === "ADMIN") return next();

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden x" });
    }

    next();
  };
};

export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

export const requireOwner = (entity) => {
  return async (req, res, next) => {
    const entityId = req.params.id;
    const userId = req.user.id;

    const record = await prisma[entity].findUnique({
      where: { id: entityId },
    });

    if (!record) return res.status(404).json({ error: "Not found" });

    if (record.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};

