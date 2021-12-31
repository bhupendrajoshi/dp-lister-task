import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('dp-lister-task tests', function () {

    before( function() {

    });

    after(() => {

    });

    it('should succeed with simple inputs', function(done: Mocha.Done) {
      this.timeout(1000);

      let tp = path.join(__dirname, 'success.js');
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

      tr.run();
      assert.equal(tr.succeeded, true, 'should have succeeded');
      assert.equal(tr.warningIssues.length, 0, "should have no warnings");
      assert.equal(tr.errorIssues.length, 0, "should have no errors");
      assert.equal(tr.stdout.indexOf('Looking into c:/agent_work/1/s') >= 0, true, "should display Looking into c:/agent_work/1/s");
      done();
    });

    it('it should fail if tool returns 1', function(done: Mocha.Done) {
      this.timeout(1000);

      let tp = path.join(__dirname, 'failure.js');
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);

      tr.run();
      assert.equal(tr.succeeded, false, 'should have failed');
      assert.equal(tr.warningIssues.length, 0, "should have no warnings");
      assert.equal(tr.errorIssues.length, 1, "should have 1 error issue");
      assert.equal(tr.errorIssues[0], 'Input required: workingDirectory', 'error issue output');
      assert.equal(tr.stdout.indexOf('Looking into '), -1, "Should not display Looking into");
      done();
    });
});
