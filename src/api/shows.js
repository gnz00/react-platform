/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Router } from 'express';
import util from '../utils/router-util.js';

const router = new Router();
const resource = "shows";

router.get('/', async (req, res, next) => {
  var data = util.getAll(resource);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 3));
});

router.get('/:id', async (req, res, next) => {
  var data = util.getOne(resource, req.params.id);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 3));
});

router.get('/:id/relationships/:relationship_type', async (req, res, next) => {
  var data = util.getRelationship(resource, req.params.id, req.params.relationship_type);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 3));
});


router.get('/:id/:relationship_type', async (req, res, next) => {
  var data = util.getAllRelationship(resource, req.params.id, req.params.relationship_type);

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 3));
});

export default router;


