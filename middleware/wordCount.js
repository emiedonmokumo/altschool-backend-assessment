function wordCount(body, averageSpeed = 200) {
    const wordCount = body.split(/\s+/).length;

    const readingTime = wordCount / averageSpeed;

    return Math.round(readingTime);
}

module.exports = wordCount;