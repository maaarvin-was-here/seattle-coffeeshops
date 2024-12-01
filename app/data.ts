import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import { shops } from "app/database";

type StoreMutation = {
  id?: string;
  name?: string;
  location?: string;
  mapLink?: string;
  notes?: string[] | undefined;
  imageLink?: string;
  // favorite?: boolean;
};

export type StoreObject = StoreMutation & {
  id: string;
};


// fake db table (i'm too poor to host a real db)
const storeDB = {
  stores: {} as Record<string, StoreObject>,

  async getAll(): Promise<StoreObject[]> {
    return Object.keys(storeDB.stores)
      .map((key) => storeDB.stores[key])
      .sort(sortBy("name"));
  },

  async get(id: string): Promise<StoreObject | null> {
    return storeDB.stores[id] || null;
  },

  async create(values: StoreMutation): Promise<StoreObject> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const newContact = { id, ...values };
    storeDB.stores[id] = newContact;
    return newContact;
  },

};

// helper functions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await storeDB.getAll();
  if (query == "null"){
    query = "";
  }
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["name", "location"]
    });
  }
  return contacts.sort(sortBy("name", "location"));
}

export async function getContact(id: string) {
  return storeDB.get(id);
}


shops.forEach((contact) => {
  console.log("CREATING " + contact.name);
  storeDB.create({
    ...contact,
    id: `${contact.name.toLowerCase()}`,
  });
});
