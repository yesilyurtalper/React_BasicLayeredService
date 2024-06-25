export default function generateSearchKey(entity, query) {
    let key = entity === "events" ? 
    `${entity}/?author=${query.author}/&title=${query.title}/&body=${query.body}/&`
}