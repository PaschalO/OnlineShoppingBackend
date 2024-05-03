/**
 * Enum representing the permissions related to products.
 * @enum {string}
 */
enum productPermission {
	createPermission = "create:product",
	updatePermission = "edit:product",
	deletePermission = "delete:product",
	readPermission = "read:product"
}

export { productPermission };
