import { inject, Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  FieldValue,
  Firestore,
  query,
  setDoc,
  collection,
  or,
  orderBy,
  where,
  Timestamp,
  docData,
  deleteDoc,
} from '@angular/fire/firestore';
import { Project } from '../../models/project.model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private fs = inject(Firestore);

  projectCol = 'projects';

  createDocId = (colName: string) => doc(collection(this.fs, colName)).id;

  setProject(p: Project<FieldValue>) {
    const projectColRef = collection(this.fs, this.projectCol);
    const projectDocRef = doc(projectColRef, p.id);
    return setDoc(projectDocRef, p, { merge: true });
  }
  getProjects(user: User) {
    const projectColRef = collection(this.fs, this.projectCol);
    const queryProjects = query(
      projectColRef,
      or(
        where('uid', '==', user.uid),
        where('contributors', 'array-contains', user.email)
      ),
      orderBy('createdAt', 'desc')
    );
    return collectionData(queryProjects);
  }

  getDocData(colName: string, id: string) {
    return docData(doc(this.fs, colName, id));
  }

  deleteData(colName: string, id: string) {
    return deleteDoc(doc(this.fs, colName, id));
  }

  formatedTimestamp = (t?: Timestamp) => (t?.seconds ? t.toDate() : new Date());
}
