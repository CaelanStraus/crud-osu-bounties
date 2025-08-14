const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const osuBountiesImagesPath = path.resolve(process.env.OSU_BOUNTIES_IMAGES_PATH);
const profileImagesPath = path.join(osuBountiesImagesPath, 'profiles');
const beatmapImagesPath = path.join(osuBountiesImagesPath, 'beatmaps');

console.log('Serving Laravel images from:', osuBountiesImagesPath);
app.use('/images', express.static(osuBountiesImagesPath));

const bountiesRoutes = require('./routes/bounties')(beatmapImagesPath);
const usersRoutes = require('./routes/users')(profileImagesPath);

app.use('/api/bounties', bountiesRoutes);
app.use('/api/users', usersRoutes);

const dbModule = require('./db');
app.get('/api/dbpath', (req, res) => {
  res.json({ currentPath: dbModule.getPath() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
