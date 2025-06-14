export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\s/g, "");
  };